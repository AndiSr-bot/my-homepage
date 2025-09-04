/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { storage } from "../../helpers/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const index = (props) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const uploadProps = {
        customRequest: async ({ onSuccess, onError }) => {
            try {
                const storageRef = ref(
                    storage,
                    props.path +
                        Date.now() +
                        " - " +
                        fileList[0].originFileObj.name
                );
                const uploadTask = uploadBytesResumable(
                    storageRef,
                    fileList[0].originFileObj
                );
                uploadTask.on(
                    "state_changed",
                    (snapshot) => console.log(snapshot),
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            onSuccess();
                            props.setInputImage(url);
                        });
                    }
                );
            } catch (error) {
                onError();
                console.error("Error:", error);
            }
        },
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}>
                Upload
            </div>
        </div>
    );
    // useEffect(() => {
    //     if (fileList.length < 1) {
    //         props.setInputImage("");
    //     }
    // }, [fileList]);
    // console.log(fileList, "fileList");
    return (
        <>
            <Upload
                {...uploadProps}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}>
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: "100%",
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
export default index;
