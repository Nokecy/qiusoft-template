import { useEffect } from "react";

function useDraggableDialog() {
    useEffect(() => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const modal: any = document.querySelector('.ant-modal');
                    const header: any = modal?.querySelector('.ant-modal-header');

                    if (modal && header) {
                        header.style.cursor = 'move';
                        let left = 0;
                        let top = 0;

                        const onMouseDown = (e: MouseEvent) => {
                            const startX = e.clientX;
                            const startY = e.clientY;

                            header.left = header.offsetLeft
                            header.top = header.offsetTop

                            const onMouseMove = (event: MouseEvent) => {
                                const endX = event.clientX
                                const endY = event.clientY
                                modal.left = header.left + (endX - startX) + left
                                modal.top = header.top + (endY - startY) + top
                                modal.style.left = modal.left + 'px'
                                modal.style.top = modal.top + 'px'
                            };

                            const onMouseUp = () => {
                                left = modal.left
                                top = modal.top
                                document.removeEventListener('mousemove', onMouseMove);
                                document.removeEventListener('mouseup', onMouseUp);
                            };

                            document.addEventListener('mousemove', onMouseMove);
                            document.addEventListener('mouseup', onMouseUp);
                        };

                        header.addEventListener('mousedown', onMouseDown);

                        return () => {
                            header.removeEventListener('mousedown', onMouseDown);
                        };
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);
}

export default useDraggableDialog;