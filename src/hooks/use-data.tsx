import {create} from 'zustand';
import { persist } from 'zustand/middleware';

// Define the types for the data structure
interface Widget {
  id: number;
  name: string;
  description: string;
  visible: boolean;
}

interface Category {
  id: number;
  name: string;
  widgets: Widget[];
}

interface DashboardData {
  categories: Category[];
}

// Define the Zustand store state and actions
interface DashboardState {
    searchResults: Category[];
    data: DashboardData;
  addWidget: (categoryId: number, widget: Widget) => void;
  deleteWidget: (categoryId: number, widgetId: number) => void;
  searchWidgets: (query: string) => void;
  toggleWidgetVisibility: (categoryId: number, widgetId: number) => void;
}
const initialData = {
    categories: [
      {
        id: 1,
        name: 'CSPM Executive',
        widgets: [],
      },
      {
        id: 2,
        name: 'CWPP',
        widgets: [],
      },
      {
        id: 3,
        name: 'Registry Scan',
        widgets: [],
      },
    ],
}

// Create the Zustand store
const useDashboardStore = create<DashboardState>()(persist((set) => ({
    searchResults: [],
  data: initialData,
  addWidget: (categoryId: number, widget: Widget) =>
    set((state) => ({
      data: {
        categories: state.data.categories.map((category) =>
          category.id === categoryId
            ? { ...category, widgets: [...category.widgets, widget] }
            : category
        ),
      },
    })),
  deleteWidget: (categoryId: number, widgetId: number) =>
    set((state) => ({
      data: {
        categories: state.data.categories.map((category) =>
          category.id === categoryId
            ? { ...category, widgets: category.widgets.filter((widget) => widget.id !== widgetId) }
            : category
        ),
      },
    })),
    searchWidgets: (query: string) =>
        set((state) => {
          if (!query) {
            return { searchResults: [] };
          }
          
          const lowercaseQuery = query.toLowerCase();
          const filteredCategories = state.data.categories.map((category) => ({
            ...category,
            widgets: category.widgets.filter(
              (widget) =>
                widget.name.toLowerCase().includes(lowercaseQuery) ||
                widget.description.toLowerCase().includes(lowercaseQuery)
            ),
          })).filter((category) => category.widgets.length > 0);
          
          return { searchResults: filteredCategories };
        }),
    toggleWidgetVisibility: (categoryId: number, widgetId: number) =>
        set((state) => ({
          data: {
            categories: state.data.categories.map((category) =>
              category.id === categoryId
                ? { ...category, widgets: category.widgets.map((widget) =>
                  widget.id === widgetId
                    ? { ...widget, visible: !widget.visible }
                    : widget
                )}
                : category
            ),
          },
        })),
  
}), {name: 'widget-dashboard'}));

export default useDashboardStore;