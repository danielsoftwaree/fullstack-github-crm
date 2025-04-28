import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core'
import { LoginForm } from '../login-form/login-form'
import { RegisterForm } from '../register-form/register-form'
import { IconLogin, IconUserPlus } from '@tabler/icons-react'

export function AuthForm() {
    return (
        <Tabs variant="outline" defaultValue="login" w={300}>
            <TabsList grow>
                <TabsTab value="login" leftSection={<IconLogin size={16} />}>
                    Login
                </TabsTab>
                <TabsTab
                    value="register"
                    leftSection={<IconUserPlus size={16} />}
                >
                    Register
                </TabsTab>
            </TabsList>
            <TabsPanel value="login">
                <LoginForm />
            </TabsPanel>
            <TabsPanel value="register">
                <RegisterForm />
            </TabsPanel>
        </Tabs>
    )
}
