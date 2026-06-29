// Resize uploaded images via canvas to keep localStorage size under control.
export function fileToCompressedDataURL(file, { maxDim = 1400, quality = 0.82 } = {}) {
    return new Promise((resolve, reject) => {
        if (!file) return reject(new Error("No file"));
        if (!file.type.startsWith("image/")) return reject(new Error("Not an image"));

        const reader = new FileReader();
        reader.onerror = () => reject(reader.error);
        reader.onload = () => {
            const img = new Image();
            img.onerror = () => reject(new Error("Image decode failed"));
            img.onload = () => {
                const { width: w, height: h } = img;
                const scale = Math.min(1, maxDim / Math.max(w, h));
                const tw = Math.round(w * scale);
                const th = Math.round(h * scale);
                const canvas = document.createElement("canvas");
                canvas.width = tw;
                canvas.height = th;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, tw, th);
                try {
                    resolve(canvas.toDataURL("image/jpeg", quality));
                } catch (e) {
                    reject(e);
                }
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}
