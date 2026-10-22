import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";

import type { Guitar } from "../types";
import { MAX_ITEMS, useCart } from "./useCart";

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

  it('does not add more than the maximum quantity of a guitar', () => {
    const { result } = renderHook(() => useCart());

    for (let i = 0; i < MAX_ITEMS + 2; i++) {
      act(() => result.current.addToCart(lukather));
    }

    expect(result.current.cart[0].quantity).toBe(MAX_ITEMS);
  });

  it('increases and decreases the quantity within the limits', () => {
    const { result } = renderHook(() => useCart());

    act(() => result.current.addToCart(lukather));
    act(() => result.current.increaseQuantity(lukather.id));

    expect(result.current.cart[0].quantity).toBe(2);

    act(() => result.current.decreaseQuantity(lukather.id));
    act(() => result.current.decreaseQuantity(lukather.id));

    expect(result.current.cart[0].quantity).toBe(1);

  });

  it('removes a guitar from the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => result.current.addToCart(lukather));
    act(() => result.current.addToCart(srv));

    act(() => result.current.removeFromCart(lukather.id));


    expect(result.current.cart).toEqual([{ ...srv, quantity: 1 }]);
  })

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => result.current.addToCart(lukather));

    act(() => result.current.clearCart());

    expect(result.current.cart).toEqual([]);
  })
});


