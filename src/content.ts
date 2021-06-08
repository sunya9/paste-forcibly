const hasValue = (
  eventTarget: EventTarget | null
): eventTarget is HTMLInputElement | HTMLTextAreaElement => {
  return (
    !!eventTarget &&
    (eventTarget instanceof HTMLInputElement ||
      eventTarget instanceof HTMLTextAreaElement)
  );
};

let lastInput: HTMLInputElement | HTMLTextAreaElement | null;

document.addEventListener(
  "focus",
  (e) => {
    if (!hasValue(e.target)) return;
    lastInput = e.target;
  },
  {
    capture: true,
  }
);

chrome.runtime.onMessage.addListener((message, sender) => {
  const msg = message;
  if (sender.id !== chrome.runtime.id || typeof msg !== "string" || !lastInput)
    return;
  lastInput.value = msg;
});
