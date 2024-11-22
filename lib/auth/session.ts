import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse,} from "next"
import {getServerSession} from "next-auth"
import authConfig from "@/lib/auth/config";

export default function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authConfig)
}
