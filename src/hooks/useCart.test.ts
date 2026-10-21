import { describe, expect, it } from "vitest";
import type { Guitar } from "../types";
import { act, renderHook } from "@testing-library/react";
import { useCart } from "./useCart";

const lukather: Guitar = {
  id: 1,
  name: 'Lukather',
  image: 'guitarra_01',
  description: 'Una guitarra de prueba',
  price: 299,
};

const srv: Guitar = {
  id: 2,
  name: 'SRV',
  image: 'guitarra_02',
  description: 'Otra guitarra de prueba',
  price: 349,
};

describe('useCart', () => {
  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => result.current.addToCart(lukather));

    expect(result.current.cart).toEqual([{ ...lukather, quantity: 1 }]);
  });

  it('increments the quantity when the same guitar is added again', () => {
    const { result } = renderHook(() => useCart());

    act(() => result.current.addToCart(lukather));
    act(() => result.current.addToCart(srv));
    act(() => result.current.addToCart(lukather));

    expect(result.current.cart).toEqual([
      { ...lukather, quantity: 2 },
      { ...srv, quantity: 1 },
    ]);
  });
});