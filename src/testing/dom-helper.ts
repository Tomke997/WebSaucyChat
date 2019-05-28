import {ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>;
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  count(tagName: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.length;
  }
/*
  countText(tagName: string, text: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.filter(element => element.nativeElement.textContent === text).length;
  }

  clickButton(buttonText: string) {
    this.findAll('button').forEach(button => {
      const buttonElement: HTMLButtonElement =
        button.nativeElement;
      if (buttonElement.textContent === buttonText) {
        buttonElement.click();
      }
    });
  }

  findAll(tagName: string) {
    return this.fixture.debugElement
      .queryAll(By.css(tagName));
  }*/
}
