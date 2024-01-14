import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Defines the possible modes for the application's menu
export type MenuMode =
  | 'static'
  | 'overlay'
  | 'horizontal'
  | 'slim'
  | 'slim-plus'
  | 'reveal'
  | 'drawer';

// Defines the possible color schemes for the application
export type ColorScheme = 'light' | 'dark' | 'dim';

// Defines the different themes for the menu
export type MenuColorScheme = 'colorScheme' | 'primaryColor' | 'transparent';

// Represents the configuration for the application's layout
export interface AppConfig {
  inputStyle: string;
  colorScheme: ColorScheme;
  theme: string;
  ripple: boolean;
  menuMode: MenuMode;
  scale: number;
  menuTheme: MenuColorScheme;
}

// Represents the state of the layout
interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
  sidebarActive: boolean;
  anchored: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class LayoutService {
  // Default configuration settings for the layout
  config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'reveal',
    colorScheme: 'light',
    theme: 'indigo',
    scale: 14,
    menuTheme: 'colorScheme',
  };

  // Initial state settings for the layout
  state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    sidebarActive: false,
    anchored: false,
  };

  // Subject to emit configuration updates
  private configUpdate = new Subject<AppConfig>();

  // Subject to notify when overlay is opened
  private overlayOpen = new Subject<any>();

  // Observable stream for configuration updates
  configUpdate$ = this.configUpdate.asObservable();

  // Observable stream for overlay open events
  overlayOpen$ = this.overlayOpen.asObservable();

  // Handles toggling of the menu based on the current mode
  onMenuToggle() {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;

      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive =
        !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  // Notifies the overlay open event
  onOverlaySubmenuOpen() {
    this.overlayOpen.next(null);
  }

  // Shows the profile sidebar
  showProfileSidebar() {
    this.state.profileSidebarVisible = true;
  }

  // Shows the config sidebar
  showConfigSidebar() {
    this.state.configSidebarVisible = true;
  }

  // Checks if the menu mode is overlay
  isOverlay() {
    return this.config.menuMode === 'overlay';
  }

  // Checks if the screen is in desktop mode
  isDesktop() {
    return window.innerWidth > 991;
  }

  // Checks if the menu mode is slim
  isSlim() {
    return this.config.menuMode === 'slim';
  }

  // Checks if the menu mode is slim-plus
  isSlimPlus() {
    return this.config.menuMode === 'slim-plus';
  }

  // Checks if the menu mode is horizontal
  isHorizontal() {
    return this.config.menuMode === 'horizontal';
  }

  // Checks if the screen is in mobile mode
  isMobile() {
    return !this.isDesktop();
  }

  // Notifies subscribers about configuration updates
  onConfigUpdate() {
    this.configUpdate.next(this.config);
  }
}
