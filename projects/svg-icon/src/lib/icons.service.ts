import { DomSanitizer } from '@angular/platform-browser';
import { inject, Injectable } from '@angular/core';
import { SvgIconRegistry } from './icon-registry';

@Injectable({ providedIn: 'root' })
export class IconsService {
  constructor() {
    const domSanitizer = inject(DomSanitizer);
    const svgIconRegistry = inject(SvgIconRegistry);

    // Register icon sets
    svgIconRegistry.addSvgIconSetInNamespace('heroicons_outline', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-outline.svg'));
    svgIconRegistry.addSvgIconSetInNamespace('heroicons_solid', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-solid.svg'));
    svgIconRegistry.addSvgIconSetInNamespace('custome_outline', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/custome-outline.svg'));
    svgIconRegistry.addSvgIconSetInNamespace('custome_solid', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/custome-solid.svg'));
  }
}
