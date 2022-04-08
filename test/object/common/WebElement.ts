import { ElementHandle } from '@playwright/test';

type WebElement = ElementHandle<HTMLElement | SVGElement>;

export default WebElement;
