import { FilterStatus } from "@/types/filter-status";
import { CircleDashed, CircleCheck } from "lucide-react-native"

export function StatusIcon({ status }: { status: FilterStatus }) {
    return (status === FilterStatus.DONE ?
        (
            <CircleCheck size={18} color={"#000000"}></CircleCheck>
        ) :
        (
            <CircleDashed size={18} color={"#000000"}></CircleDashed>
        )
    )
}