/** @module UITypes */

/**
 *  @example true 
 *  @description Отвечает за предзагрузку компонента (скелетон-эффект).
 */
export type UIPreload = boolean

/**
 *  @example 'stretched'
 *  @description Отвечает за растягивание компонента в ширину.
 *  Значение `stretched` растягивает элемент по ширине родителя
 *  Значение `tight` минимально сморщивает элемент с учетом детей.
 */
export type UIStretching = 'stretched' | 'tight'