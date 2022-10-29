export const tick = async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 0));
};
