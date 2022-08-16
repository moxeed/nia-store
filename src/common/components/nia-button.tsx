import {ReactNode} from "react";

export const NiaButton = ({
                              onClick,
                              children,
                              className
                          }: { onClick: () => void, children: ReactNode, className?: string }) => {
    return <div className={"p-2 bg-white rounded text-center overflow-hidden hover:bg-gray-100 border-gray-400 border-2 m-1 " + className} onClick={onClick}>
        {children}
    </div>
}