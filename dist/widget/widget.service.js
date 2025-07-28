"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetService = void 0;
const common_1 = require("@nestjs/common");
let WidgetService = class WidgetService {
    getHtml(widgetID) {
        return `
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <title>Widget ${widgetID}</title>
    
            <!-- Icons -->
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="https://universe-static.elfsightcdn.com/widget-page/elfsight-glyph-180x180.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="https://universe-static.elfsightcdn.com/widget-page/elfsight-glyph-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="https://universe-static.elfsightcdn.com/widget-page/elfsight-glyph-16x16.png"
            />
    
            <!-- OG -->
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Untitled Form Builder 43" />
            <meta
              property="og:description"
              content="Click the link to interact with Elfsight Form Builder"
            />
    
            <!-- Preconnect & Preload -->
            <link rel="preconnect" href="https://core.service.elfsight.com" />
    
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />
          </head>
          <body style="">
            <style>
              body {
                margin: 0;
                font: 400 18px/1.555 -apple-system, BlinkMacSystemFont, Roboto,
                  Open Sans, Helvetica Neue, sans-serif;
                padding: 60px 40px;
              }
              @media (max-width: 900px) {
                body {
                  padding: 32px 20px;
                }
              }
            </style>
            <script>
              window.eappsCustomPlatformUrl = 'https://core.service.elfsight.com';
            </script>
            <script src="https://static.elfsight.com/platform/platform.js"></script>
            <div class="elfsight-app-${widgetID}"></div>
          </body>
        </html>
    `;
    }
};
exports.WidgetService = WidgetService;
exports.WidgetService = WidgetService = __decorate([
    (0, common_1.Injectable)()
], WidgetService);
//# sourceMappingURL=widget.service.js.map