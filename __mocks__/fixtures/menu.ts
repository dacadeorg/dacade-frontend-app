import { Items } from "@/store/feature/communities/navigation.slice";

export const mockItems: Items = {
    hideTitle: true,
    title: "item title",
    id: "1",
    items: [
        {
            id: "menu 1",
            subitems: [
                {
                    label: "Menu 1",
                    link: "/menu/1",
                    exact: true,
                },
            ],
            label: "Menu 1",
            link: "/menu/1",
            exact: true,
        },
        {
            id: "menu 2",
            subitems: [
                {
                    label: "Menu 2",
                    link: "/menu/2",
                    exact: true,
                },
            ],
            label: "Menu 2",
            link: "/menu/2",
            exact: true,
        },
    ],
};