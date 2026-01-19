export type Listener = () => void;

export type NavigateListener = {
    key: string;
    listener: () => void;
};

export type AddListener = (key: string, listener: Listener) => void;

export type RemoveListener = (key: string) => void;

export type NavigateContextType = NavigateListener[];
