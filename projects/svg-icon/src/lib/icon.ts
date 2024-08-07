/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { DOCUMENT } from '@angular/common';
import {
  AfterViewChecked,
  Attribute,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ErrorHandler,
  inject,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { SvgIconRegistry } from './icon-registry';

/**
 * Injection token used to provide the current location to `SvgIcon`.
 * Used to handle server-side rendering and to stub out during unit tests.
 * @docs-private
 */
export const SVG_ICON_LOCATION = new InjectionToken<SvgIconLocation>('svg-icon-location', {
  providedIn: 'root',
  factory: SVG_ICON_LOCATION_FACTORY,
});

/**
 * Stubbed out location for `SvgIcon`.
 * @docs-private
 */
export interface SvgIconLocation {
  getPathname: () => string;
}

/** @docs-private */
export function SVG_ICON_LOCATION_FACTORY(): SvgIconLocation {
  const _document = inject(DOCUMENT);
  const _location = _document ? _document.location : null;

  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => (_location ? _location.pathname + _location.search : ''),
  };
}

/** SVG attributes that accept a FuncIRI (e.g. `url(<something>)`). */
const funcIriAttributes = [
  'clip-path',
  'color-profile',
  'src',
  'cursor',
  'fill',
  'filter',
  'marker',
  'marker-start',
  'marker-mid',
  'marker-end',
  'mask',
  'stroke',
];

/** Selector that can be used to find all elements that are using a `FuncIRI`. */
const funcIriAttributeSelector = funcIriAttributes.map(attr => `[${attr}]`).join(', ');

/** Regex that can be used to extract the id out of a FuncIRI. */
const funcIriPattern = /^url\(['"]?#(.*?)['"]?\)$/;

/**
 * Component to display an icon. It can be used in the following ways:
 *
 * - Specify the svgIcon input to load an SVG icon from a URL previously registered with the
 *   addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of
 *   SvgIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format
 *   "[namespace]:[name]", if not the value will be the name of an icon in the default namespace.
 *   Examples:
 *     `<svg-icon svgIcon="left-arrow"></svg-icon>
 *     <svg-icon svgIcon="animals:cat"></svg-icon>`
 *
 * - Use a font ligature as an icon by putting the ligature text in the `fontIcon` attribute or the
 *   content of the `<svg-icon>` component. If you register a custom font class, don't forget to also
 *   include the special class `svg-ligature-font`. It is recommended to use the attribute alternative
 *   to prevent the ligature text to be selectable and to appear in search engine results.
 *   By default, the svg icons font is used as described at
 *   http://google.github.io/material-design-icons/#icon-font-for-the-web. You can specify an
 *   alternate font by setting the fontSet input to either the CSS class to apply to use the
 *   desired font, or to an alias previously registered with SvgIconRegistry.registerFontClassAlias.
 *   Examples:
 *     `<svg-icon fontIcon="home"></svg-icon>
 *     <svg-icon>home</svg-icon>
 *     <svg-icon fontSet="myfont" fontIcon="sun"></svg-icon>
 *     <svg-icon fontSet="myfont">sun</svg-icon>`
 *
 * - Specify a font glyph to be included via CSS rules by setting the fontSet input to specify the
 *   font, and the fontIcon input to specify the icon. Typically the fontIcon will specify a
 *   CSS class which causes the glyph to be displayed via a :before selector, as in
 *   https://fortawesome.github.io/Font-Awesome/examples/
 *   Example:
 *     `<svg-icon fontSet="fa" fontIcon="alarm"></svg-icon>`
 */
@Component({
  template: '<ng-content></ng-content>',
  selector: 'svg-icon',
  exportAs: 'svgIcon',
  styleUrl: 'icon.scss',
  host: {
    'role': 'img',
    'class': 'svg-icon notranslate',
    '[class]': 'color ? "svg-" + color : ""',
    '[attr.data-svg-icon-type]': '_usingFontIcon() ? "font" : "svg"',
    '[attr.data-svg-icon-name]': '_svgName || fontIcon',
    '[attr.data-svg-icon-namespace]': '_svgNamespace || fontSet',
    '[attr.fontIcon]': '_usingFontIcon() ? fontIcon : null',
    '[class.svg-icon-inline]': 'inline',
    '[class.svg-icon-no-color]': 'color !== "primary" && color !== "accent" && color !== "warn"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SvgIcon implements OnInit, AfterViewChecked, OnDestroy {

  /**
   * Whether the icon should be inlined, automatically sizing the icon to match the font size of
   * the element the icon is contained in.
   */
  @Input({ transform: booleanAttribute }) inline: boolean = false;

  /** Name of the icon in the SVG icon set. */
  @Input()
  get svgIcon(): string {
    return this._svgIcon;
  }
  set svgIcon(value: string) {
    if (value !== this._svgIcon) {
      if (value) {
        this._updateSvgIcon(value);
      } else if (this._svgIcon) {
        this._clearSvgElement();
      }
      this._svgIcon = value;
    }
  }
  private _svgIcon: string = '';

  /** Font set that the icon is a part of. */
  @Input()
  get fontSet(): string {
    return this._fontSet;
  }
  set fontSet(value: string) {
    const newValue = this._cleanupFontValue(value);

    if (newValue !== this._fontSet) {
      this._fontSet = newValue;
      this._updateFontIconClasses();
    }
  }
  private _fontSet: string = '';

  /** Name of an icon within a font set. */
  @Input()
  get fontIcon(): string {
    return this._fontIcon;
  }
  set fontIcon(value: string) {
    const newValue = this._cleanupFontValue(value);

    if (newValue !== this._fontIcon) {
      this._fontIcon = newValue;
      this._updateFontIconClasses();
    }
  }
  private _fontIcon: string = '';

  private _previousFontSetClass: string[] = [];
  private _previousFontIconClass: string = '';

  _svgName: string | null = null;
  _svgNamespace: string | null = null;

  /** Keeps track of the current page path. */
  private _previousPath?: string;

  /** Keeps track of the elements and attributes that we've prefixed with the current path. */
  private _elementsWithExternalReferences?: Map<Element, { name: string; value: string }[]>;

  /** Subscription to the current in-progress SVG icon request. */
  private _currentIconFetch = Subscription.EMPTY;

  constructor(
    readonly _elementRef: ElementRef<HTMLElement>,
    private _iconRegistry: SvgIconRegistry,
    private readonly _errorHandler: ErrorHandler,
    @Attribute('aria-hidden') ariaHidden: string,
    @Inject(SVG_ICON_LOCATION) private _location: SvgIconLocation,
  ) {

    // If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
    // the right thing to do for the majority of icon use-cases.
    if (!ariaHidden) {
      _elementRef.nativeElement.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Splits an svgIcon binding value into its icon set and icon name components.
   * Returns a 2-element array of [(icon set), (icon name)].
   * The separator for the two fields is ':'. If there is no separator, an empty
   * string is returned for the icon set and the entire value is returned for
   * the icon name. If the argument is falsy, returns an array of two empty strings.
   * Throws an error if the name contains two or more ':' separators.
   * Examples:
   *   `'social:cake' -> ['social', 'cake']
   *   'penguin' -> ['', 'penguin']
   *   null -> ['', '']
   *   'a:b:c' -> (throws Error)`
   */
  private _splitIconName(iconName: string): [string, string] {
    if (!iconName) {
      return ['', ''];
    }
    const parts = iconName.split(':');
    switch (parts.length) {
      case 1:
        return ['', parts[0]]; // Use default namespace.
      case 2:
        return <[string, string]>parts;
      default:
        throw Error(`Invalid icon name: "${iconName}"`); // TODO: add an ngDevMode check
    }
  }

  ngOnInit() {
    // Update font classes because ngOnChanges won't be called if none of the inputs are present,
    // e.g. <svg-icon>arrow</svg-icon> In this case we need to add a CSS class for the default font.
    this._updateFontIconClasses();
  }

  ngAfterViewChecked() {
    const cachedElements = this._elementsWithExternalReferences;

    if (cachedElements && cachedElements.size) {
      const newPath = this._location.getPathname();

      // We need to check whether the URL has changed on each change detection since
      // the browser doesn't have an API that will let us react on link clicks and
      // we can't depend on the Angular router. The references need to be updated,
      // because while most browsers don't care whether the URL is correct after
      // the first render, Safari will break if the user navigates to a different
      // page and the SVG isn't re-rendered.
      if (newPath !== this._previousPath) {
        this._previousPath = newPath;
        this._prependPathToReferences(newPath);
      }
    }
  }

  ngOnDestroy() {
    this._currentIconFetch.unsubscribe();

    if (this._elementsWithExternalReferences) {
      this._elementsWithExternalReferences.clear();
    }
  }

  _usingFontIcon(): boolean {
    return !this.svgIcon;
  }

  private _setSvgElement(svg: SVGElement) {
    this._clearSvgElement();

    // Note: we do this fix here, rather than the icon registry, because the
    // references have to point to the URL at the time that the icon was created.
    const path = this._location.getPathname();
    this._previousPath = path;
    this._cacheChildrenWithExternalReferences(svg);
    this._prependPathToReferences(path);
    this._elementRef.nativeElement.appendChild(svg);
  }

  private _clearSvgElement() {
    const layoutElement: HTMLElement = this._elementRef.nativeElement;
    let childCount = layoutElement.childNodes.length;

    if (this._elementsWithExternalReferences) {
      this._elementsWithExternalReferences.clear();
    }

    // Remove existing non-element child nodes and SVGs, and add the new SVG element. Note that
    // we can't use innerHTML, because IE will throw if the element has a data binding.
    while (childCount--) {
      const child = layoutElement.childNodes[childCount];

      // 1 corresponds to Node.ELEMENT_NODE. We remove all non-element nodes in order to get rid
      // of any loose text nodes, as well as any SVG elements in order to remove any old icons.
      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        child.remove();
      }
    }
  }

  private _updateFontIconClasses() {
    if (!this._usingFontIcon()) {
      return;
    }

    const elem: HTMLElement = this._elementRef.nativeElement;
    const fontSetClasses = (
      this.fontSet
        ? this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/)
        : this._iconRegistry.getDefaultFontSetClass()
    ).filter(className => className.length > 0);

    this._previousFontSetClass.forEach(className => elem.classList.remove(className));
    fontSetClasses.forEach(className => elem.classList.add(className));
    this._previousFontSetClass = fontSetClasses;

    if (
      this.fontIcon !== this._previousFontIconClass &&
      !fontSetClasses.includes('svg-ligature-font')
    ) {
      if (this._previousFontIconClass) {
        elem.classList.remove(this._previousFontIconClass);
      }
      if (this.fontIcon) {
        elem.classList.add(this.fontIcon);
      }
      this._previousFontIconClass = this.fontIcon;
    }
  }

  /**
   * Cleans up a value to be used as a fontIcon or fontSet.
   * Since the value ends up being assigned as a CSS class, we
   * have to trim the value and omit space-separated values.
   */
  private _cleanupFontValue(value: string) {
    return typeof value === 'string' ? value.trim().split(' ')[0] : value;
  }

  /**
   * Prepends the current path to all elements that have an attribute pointing to a `FuncIRI`
   * reference. This is required because WebKit browsers require references to be prefixed with
   * the current path, if the page has a `base` tag.
   */
  private _prependPathToReferences(path: string) {
    const elements = this._elementsWithExternalReferences;

    if (elements) {
      elements.forEach((attrs, element) => {
        attrs.forEach(attr => {
          element.setAttribute(attr.name, `url('${path}#${attr.value}')`);
        });
      });
    }
  }

  /**
   * Caches the children of an SVG element that have `url()`
   * references that we need to prefix with the current path.
   */
  private _cacheChildrenWithExternalReferences(element: SVGElement) {
    const elementsWithFuncIri = element.querySelectorAll(funcIriAttributeSelector);
    const elements = (this._elementsWithExternalReferences =
      this._elementsWithExternalReferences || new Map());

    for (let i = 0; i < elementsWithFuncIri.length; i++) {
      funcIriAttributes.forEach(attr => {
        const elementWithReference = elementsWithFuncIri[i];
        const value = elementWithReference.getAttribute(attr);
        const match = value ? value.match(funcIriPattern) : null;

        if (match) {
          let attributes = elements.get(elementWithReference);

          if (!attributes) {
            attributes = [];
            elements.set(elementWithReference, attributes);
          }

          attributes!.push({ name: attr, value: match[1] });
        }
      });
    }
  }

  /** Sets a new SVG icon with a particular name. */
  private _updateSvgIcon(rawName: string | undefined) {
    this._svgNamespace = null;
    this._svgName = null;
    this._currentIconFetch.unsubscribe();

    if (rawName) {
      const [namespace, iconName] = this._splitIconName(rawName);

      if (namespace) {
        this._svgNamespace = namespace;
      }

      if (iconName) {
        this._svgName = iconName;
      }

      this._currentIconFetch = this._iconRegistry
        .getNamedSvgIcon(iconName, namespace)
        .pipe(take(1))
        .subscribe(
          svg => this._setSvgElement(svg),
          (err: Error) => {
            const errorMessage = `Error retrieving icon ${namespace}:${iconName}! ${err.message}`;
            this._errorHandler.handleError(new Error(errorMessage));
          },
        );
    }
  }
}
