import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import useDashboardStore from "@/hooks/use-data"
import {  useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
  

export default function ManageBtn() {

    const {  data, toggleWidgetVisibility } = useDashboardStore()
    
    const [activeCategory, setActiveCategory] = useState(data.categories[0]?.id || 1)

  const widgetList = data.categories.find((category) => category.id === activeCategory)?.widgets;

  console.log('list', widgetList)

  return (
<Sheet>
  <SheetTrigger>
  <Button variant="outline" >Manage Widgets</Button>

  </SheetTrigger>
  <SheetContent className="min-w-[40vw]" >
    <SheetHeader>
      <SheetTitle>Manage Widgets</SheetTitle>
      <SheetDescription>
        Personalize your dashboard by adding the following widgets.
      </SheetDescription>

<div className="flex gap-4 whitespace-nowrap overflow-auto border-b " >

        {
            data.categories.map((category) => (
                <div key={category.id} className="">
                    <div className="" >
                    <div  className={`${activeCategory === category.id ? "border-b-2 border-blue-950 text-blue-950" : "text-zinc-800"}  p-2 cursor-pointer `} onClick={() => setActiveCategory(category.id)}>
                        <p >{category.name}</p>
                    </div>
                    </div>


                </div>
            )
        )
    }
    </div>


            <div className="space-y-5 py-4"  >
                    { widgetList && widgetList.length > 0 ? widgetList.map((widget) => (
                        <div className="flex items-center space-x-2 p-4 rounded-sm border">
                            <Checkbox id={widget.id.toString()} onCheckedChange={() => {toggleWidgetVisibility(activeCategory, widget.id); toast.success(widget.visible ? "Widget hidden!" : "Widget is visible now!")}} checked={widget.visible} className="h-4 w-4 text-blue-950 focus:ring-blue-950 dark:focus:ring-blue-950" />
                            <Label
                                htmlFor={widget.id.toString()}
                                className="text-blue-950 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                {widget.name}
                            </Label> 
                    </div>
                    ))
                    :
                    <p className="text-sm  ">No widget created yet!</p>
                  }
                </div>



    </SheetHeader>
  </SheetContent>
</Sheet>

  )
}