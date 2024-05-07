import { wrapper } from "@/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
    const { store } = wrapper.useWrappedStore(children);

    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;