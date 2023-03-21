import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const translate = async (locale: string) =>{
    return {
      props: {
        ...( await serverSideTranslations(locale))
      },
    };
} 


export default translate;