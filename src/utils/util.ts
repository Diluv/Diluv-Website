import { FocusEvent } from "react";

export function onFocus(setSelectedField: Function, event: FocusEvent<any>) {
  setSelectedField(event.target.id);
}

export function onBlur(setSelectedField: Function) {
  setSelectedField("");
}
