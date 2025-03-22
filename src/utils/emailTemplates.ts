export default {
    OTP: (email: string, code: string) => ({
        subject: "Event System - OTP Verification",
        text: `Dear ${email.split('@')[0]},\n\nThank you for signing up on Events System. To complete your registration and secure your account, please use the following One-Time Password (OTP):\n\nYour OTP Code: ${code}\n\nThis code is valid for 3 minutes. Please enter it in the portal to verify your account.\n\nIf you did not request this OTP, please ignore this email or contact our support team immediately.\n\nFor any assistance, feel free to reach out to us at support.\n\nBest Regards,\nEvent System Team`,
        html: `
        <p>Dear ${email.split('@')[0]},</p>
        <p>Thank you for signing up on Events System. To complete your registration and secure your account, please use the following One-Time Password (OTP):</p>
        <h2>Your OTP Code: ${code}</h2>
        <p>This code is valid for 3 minutes. Please enter it in the portal to verify your account.</p>
        <p>If you did not request this OTP, please ignore this email or contact our support team immediately.</p>
        <p><strong>Best Regards,</strong><br>Event System Team</p>
        `
    }),

    Event: (event: any) => ({
        subject: `Event System - Approve to Join`,
        text: `Dear participants,\n\nYou have been added to ${event.name}. \n\nFor any assistance, feel free to reach out to us at support.\n\nBest Regards,\nThe Event System Team`,
        html: `
        <p>Dear participants,</p>
        <h3>You have been added to ${event.name} at ${new Date(event.event_date).toLocaleString()}</h3><br />
        <p><strong>Best Regards,</strong><br>Event System Team</p>
        `
    })
}