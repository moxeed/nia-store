export const CaputreEnterKey = (props: { onEnter: () => void, children: React.ReactNode },) => {

    const { onEnter, children } = props;

    const handleKeyDownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter")
            onEnter();
    }

    return <div onKeyDownCapture={handleKeyDownCapture}>
        {children}
    </div>;
}