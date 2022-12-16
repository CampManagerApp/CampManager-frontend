import { FCM } from "@capacitor-community/fcm"

export async function subscribe_to_org_notifications(organisation_id) {
    return await FCM.subscribeTo({ topic: `organisation${organisation_id}` })
}