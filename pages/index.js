import { useState } from 'react'

import Head from 'next/head'
import 'antd/dist/antd.css'
import zhCN from 'antd/lib/locale/zh_CN'
import styles from '../styles/Home.module.css'

import { ConfigProvider, Modal, Button, Form, Input } from 'antd'

export default function Home() {
    const [form] = Form.useForm()
    const [isShow, setShow] = useState(false)
    const [list, setList] = useState([{
        url: 'https://www.baidu.com',
        img: '/baidu.png',
        title: 'baidu'
    }])

    const onConfirm = () => {
        form.validateFields().then(values => {
            setList([
                ...list,
                {
                    url: values.url,
                    img: `${values.url}/favicon.ico`,
                    title: values.name
                }
            ])
        })
        setShow(false)
    }
    const onDelete = (index) => {
        let newlist = [...list]
        newlist.splice(index, 1)
        setList([...newlist])
    }
    return (
        <>
            <Head>
                <title>My-chrome</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {
                    list?.map((item, index) => {
                        return (
                            <div className={styles.list} key={index}>
                                <a href={item.url} target="_blank">
                                    <div className={styles.listItem}>
                                        <div className={styles.itemImg}>
                                            <img src={item.img} className={styles.img} width="30px" height="30px" />
                                        </div>
                                        <span className={styles.title}>{item.title}</span>
                                    </div>
                                </a>
                                <div className={styles.del} onClick={() => onDelete(index)}></div>
                            </div>
                        )
                    })
                }
                <div className={styles.list}>
                    <div className={styles.listItem}>
                        <div className={styles.itemImg}>
                            <div className={styles.plus} onClick={() => setShow(true)}>+</div>
                        </div>
                        <span className={styles.title}>添加快捷方式</span>
                    </div>
                </div>
            </main>


            <ConfigProvider locale={zhCN}>
                <Modal
                    title="添加快捷方式"
                    visible={isShow}
                    onCancel={() => setShow(false)}
                    onOk={onConfirm}
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <div>
                        <Form
                            form={form}
                            preserve={false}
                        >
                            <Form.Item
                                label="名称"
                                name='name'
                                initialValue=""
                                rules={[{ required: true, message: '请输入名称' }]}
                            >
                                <Input placeholder="" />
                            </Form.Item>
                            <Form.Item
                                label="网址"
                                name="url"
                                initialValue="https://"
                                rules={[{ required: true, message: '请输入网址' }]}
                            >
                                <Input placeholder="" />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    )
}