import { create } from "zustand";

const useEditorStore = create((set) => ({
  selectedLayer: "canvas",
  setSelectedLayer: (newLayer) => set({ selectedLayer: newLayer }),
  textOptions: {
    text: "",
    fontSize: 48,
    color: "#000000",
    top: 0,
    left: 0,
  },
  setTextOptions: (newOptions) =>
    set({
      textOptions: newOptions,
    }),
  addText: () =>
    set({
      textOptions: {
        text: "Add Text",
        fontSize: 48,
        color: "#000000",
        top: 0,
        left: 0,
      },
    }),
  canvasOptions: {
    height: 0,
    orientation: "",
    size: "original",
    backgroundColor: "#008033",
  },
  setCanvasOptions: (newOptions) =>
    set({
      canvasOptions: newOptions,
    }),
}));

export default useEditorStore;
