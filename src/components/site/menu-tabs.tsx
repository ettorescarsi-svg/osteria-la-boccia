import * as Tabs from "@radix-ui/react-tabs";
import { ChefHat, Leaf } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { MENU, type Dish } from "@/lib/menu-data";

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <li
      className="dish"
      data-pick={dish.pick ? "" : undefined}
      style={{ "--i": index } as CSSProperties}
    >
      <div className="flex items-baseline justify-between gap-3 sm:gap-6">
        <h3 className="dish-name">{dish.name}{dish.desc ? ` — ${dish.desc}` : ""}</h3>
        <p className="dish-price">{dish.price}</p>
      </div>
      {(dish.pick || dish.veg) && (
        <ul className="mt-2 flex flex-wrap gap-2" aria-label="Caratteristiche del piatto">
          {dish.pick && (
            <li className="badge badge-chef">
              <ChefHat size={16} strokeWidth={2} aria-hidden="true" />
              Consigliato dallo Chef
            </li>
          )}
          {dish.veg && (
            <li className="badge badge-veg">
              <Leaf size={16} strokeWidth={2} aria-hidden="true" />
              Veg
            </li>
          )}
        </ul>
      )}
    </li>
  );
}

export function MenuTabs() {
  const [value, setValue] = useState<string>(MENU[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const firstRun = useRef(true);

  // La barra sotto la scheda attiva scorre da una voce all'altra (solo transform).
  const moveBar = useCallback(() => {
    const bar = barRef.current;
    const active = listRef.current?.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
    if (!bar || !active) return;
    bar.style.transform = `translateX(${active.offsetLeft}px) scaleX(${active.offsetWidth / 100})`;
    bar.dataset["ready"] = "true";
  }, []);

  useEffect(() => {
    moveBar();
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    // Su telefono la lista scorre in orizzontale: porta la scheda scelta in vista.
    listRef.current
      ?.querySelector<HTMLElement>('[role="tab"][data-state="active"]')
      ?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [value, moveBar]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(moveBar);
    observer.observe(list);
    // I font web cambiano la larghezza delle voci quando finiscono di caricare.
    void document.fonts?.ready.then(moveBar);
    return () => observer.disconnect();
  }, [moveBar]);

  return (
    <Tabs.Root value={value} onValueChange={setValue}>
      <Tabs.List
        ref={listRef}
        aria-label="Categorie del menu"
        className="menu-list no-scrollbar -mx-5 flex snap-x overflow-x-auto px-3 sm:mx-0 sm:px-0"
      >
        {MENU.map((category) => (
          <Tabs.Trigger key={category.id} value={category.id} className="menu-tab">
            {category.label}
          </Tabs.Trigger>
        ))}
        <span ref={barRef} className="menu-bar" aria-hidden="true" />
      </Tabs.List>

      {MENU.map((category) => (
        <Tabs.Content key={category.id} value={category.id} className="menu-panel mt-8">
          <ul className="grid gap-4 md:grid-cols-2">
            {category.dishes.map((dish, index) => (
              <DishCard key={dish.name} dish={dish} index={index} />
            ))}
          </ul>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
