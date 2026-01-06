import { useContext, createContext } from "react";
import { notification } from "antd";


const NotificationContext = createContext()


export const NotificationProvider = ({ children })=>{

    const [api, contextHolder] = notification.useNotification()

    const showNotification = (type, config) => {
        api[type](config)
    }

    const values = {
        showNotification
    }
 
    return(
        <NotificationContext.Provider value={{ showNotification }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    )
}



export const useNotification = () => useContext(NotificationContext);