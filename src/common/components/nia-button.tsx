import {ReactNode} from "react";

export const NiaButton = ({
                              onClick,
                              children,
                              className
                          }: { onClick: () => void, children: ReactNode, className?: string }) => {
    return <div className={"p-2 bg-white rounded text-center overflow-hidden " + className} onClick={onClick}>
        {children}
    </div>
}