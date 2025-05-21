export function _emit(target, eventName, data) {
    target.dispatchEvent(new CustomEvent(eventName, {
        detail: data,
        bubbles: true,
        composed: true
    }));
}