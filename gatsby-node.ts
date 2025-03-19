import * as path from "path"
import type { GatsbyNode } from "gatsby"


export const onCreateWebpackConfig: GatsbyNode['createPages'] = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@/components": path.resolve(__dirname, "src/components"),
                "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
            },
        },
    })
}
