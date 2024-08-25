import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import useDashboardStore from "../hooks/use-data"
import toast from "react-hot-toast"
  

export default function DeleteWidgetBtn({widgetId, categoryId}: {widgetId: number, categoryId: number}) {

    const { deleteWidget } = useDashboardStore()

    function handleDelete() {
        deleteWidget(categoryId, widgetId)
        toast.success("Widget deleted successfully")
    }


    return(
<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="ghost" size="icon" className="absolute right-2 top-2">
    <X size={16} className="text-red-500" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button asChild variant="destructive" >
      <AlertDialogAction  onClick={handleDelete}>
        Continue
    </AlertDialogAction>
        </Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    )
}   