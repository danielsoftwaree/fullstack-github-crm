import { Button, ButtonProps } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

type AddProjectButtonProps = ButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>

export const AddProjectButton = ({
    children,
    ...rest
}: AddProjectButtonProps) => {
    return (
        <Button
            variant="outline"
            color="blue"
            leftSection={<IconPlus />}
            {...rest}
        >
            {children}
        </Button>
    )
}
