import axios from "axios";

type Translate = {
    currentLocale: string;
    newLocale: string;
    text: string;
};

/**
 * Translate using google translate API
 * @date 3/22/2023 - 10:21:46 AM
 *
 * @async
 * @param {Translate} {
    currentLocale,
    newLocale,
    text,
}
 * @returns {Promise<string>}
 */
export const Translate = async ({
    currentLocale,
    newLocale,
    text,
}: Translate): Promise<string> => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;

    if (currentLocale === newLocale) return text;

    if (!API_KEY) throw new Error("Invalid google translate api key");

    const { data } = await axios.post(
        `https://translation.googleapis.com/language/translate/v2`,
        {
            q: [text],
            source: currentLocale,
            target: newLocale,
            format: "text",
            prettyPrint: true,
        },
        {
            params: {
                key: API_KEY,
            },
        }
    );
    return data?.data?.translations[0]?.translatedText || "";
};
