import { toast } from "react-toastify";

export async function sharePw(result) { await navigator.share({ text: result }) }

export async function writeClipboardText(result) {
    try {
        if (!result) toast.warning('NOTHING TO COPY')

        await navigator.clipboard.writeText(result);
        toast.success('COPIED');
    } catch (error) {
        console.error(error.message);
    }
}
