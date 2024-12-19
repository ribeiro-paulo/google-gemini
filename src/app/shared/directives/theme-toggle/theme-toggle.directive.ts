import { DestroyRef, Directive, OnInit, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSlideToggle } from '@angular/material/slide-toggle';

export enum Theme {
  Dark = 'dark-theme',
}

@Directive({
  selector: '[gemThemeToggle]',
})
export class ThemeToggleDirective implements OnInit {
  private THEME_KEY = 'theme';

  constructor(
    private readonly renderer: Renderer2,
    private readonly destroyRef: DestroyRef,
    private readonly toggleSwitch: MatSlideToggle
  ) {}

  ngOnInit(): void {
    const isDarkMode = localStorage.getItem(this.THEME_KEY) === Theme.Dark;

    this.toggleSwitch.checked = isDarkMode;
    this.applyTheme(isDarkMode);

    this.toggleSwitchObserver();
  }

  private toggleSwitchObserver(): void {
    this.toggleSwitch.change
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const isDarkModeEnabled = this.toggleSwitch.checked;
        this.applyTheme(isDarkModeEnabled);
        this.cacheTheme(isDarkModeEnabled);
      });
  }

  private applyTheme(isDarkTheme: boolean): void {
    const body = this.renderer.selectRootElement('body', true);
    isDarkTheme
      ? this.renderer.addClass(body, Theme.Dark)
      : this.renderer.removeClass(body, Theme.Dark);
  }

  private cacheTheme(isDarkTheme: boolean): void {
    isDarkTheme
      ? localStorage.setItem(this.THEME_KEY, Theme.Dark)
      : localStorage.removeItem(this.THEME_KEY);
  }
}
