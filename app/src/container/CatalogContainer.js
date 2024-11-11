import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatalogContainer = () => {
    const [isPost, setIsPost] = useState(true);
    const [catalog, setCatalog] = useState([]);
    const [formData, setFormData] = useState({
        brand: '',
        top: 0,
        outer: 0,
        pants: 0,
        sneakers: 0,
        bag: 0,
        hat: 0,
        socks: 0,
        accessories: 0,
    });

    // 데이터 로드 함수
    const fetchCatalog = async () => {
        try {
            const response = await axios.get('http://localhost:8080/catalogs');
            setCatalog(response.data);
        } catch (error) {
            console.error('데이터를 불러오는 데 실패했습니다.', error);
        }
    };

    useEffect(() => {
        fetchCatalog();
    }, []);

    // 입력값 변경 핸들러
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 항목 추가 함수
    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8080/catalogs', [formData]);
            setCatalog([...catalog, response.data[0]]);
            setFormData({
                brand: '',
                top: 0,
                outer: 0,
                pants: 0,
                sneakers: 0,
                bag: 0,
                hat: 0,
                socks: 0,
                accessories: 0,
            });
        } catch (error) {
            console.error('항목 추가에 실패했습니다.', error);
        }
    };

    // 항목 수정 함수
    const handleEdit = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/catalogs/${id}`, formData);
            setCatalog(catalog.map((item) => (item.brand === id ? response.data : item)));
            setFormData({
                brand: '',
                top: 0,
                outer: 0,
                pants: 0,
                sneakers: 0,
                bag: 0,
                hat: 0,
                socks: 0,
                accessories: 0,
            });
            setIsPost(true)
        } catch (error) {
            console.error('항목 수정에 실패했습니다.', error);
        }
    };

    // 항목 삭제 함수
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/catalogs/${id}`);
            setCatalog(catalog.filter((item) => item.brand !== id));
        } catch (error) {
            console.error('항목 삭제에 실패했습니다.', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>카탈로그 관리</h2>
            <div>
                <label>
                    브랜드:
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                    />
                </label>
                {['top', 'outer', 'pants', 'sneakers', 'bag', 'hat', 'socks', 'accessories'].map((field) => (
                    <label key={field} style={{ marginLeft: '5px' }}>
                        {field}:
                        <input
                            type="number"
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                        />
                    </label>
                ))}
                {isPost && (
                    <button onClick={handleAdd}>추가</button>
                )}
                {!isPost && (
                    <button onClick={() => handleEdit(formData.brand)}>수정</button>
                )}
            </div>

            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>브랜드</th>
                    <th>상의</th>
                    <th>아우터</th>
                    <th>바지</th>
                    <th>스니커즈</th>
                    <th>가방</th>
                    <th>모자</th>
                    <th>양말</th>
                    <th>악세서리</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {catalog.map((item) => (
                    <tr key={item.brand}>
                        <td>{item.brand}</td>
                        <td>{item.top}</td>
                        <td>{item.outer}</td>
                        <td>{item.pants}</td>
                        <td>{item.sneakers}</td>
                        <td>{item.bag}</td>
                        <td>{item.hat}</td>
                        <td>{item.socks}</td>
                        <td>{item.accessories}</td>
                        <td>
                            <button
                                onClick={() => {
                                    setFormData(item); // 수정할 항목의 데이터를 폼에 채워 넣음
                                    setIsPost(false)
                                }}
                            >
                                수정
                            </button>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(item.brand)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CatalogContainer;