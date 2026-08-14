import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    });

    const [loading, setLoading] = useState(true);
    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/produk/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFormData(data[0]);
                setLoading(false);
            })
            .catch((err) => console.error("eerror produk:", err));

        fetch("http://localhost:5000/kategori")
            .then((res) => res.json())
            .then((data) => {
                setKategori(data);
            })
            .catch((err) => console.error("Error kategori:", err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("Yakin ingin menyimpan perubahan ini?")) {
            try {
                const res = await fetch(`http://localhost:5000/produk/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(formData),
                });
                if (res.ok) {
                    alert("Produk berhasil diperbarui!");
                    navigate("/produk");
                } else {
                    const data = await res.json();
                    alert(data.message || "Gagal merubah produk");
                }
            } catch (err) {
                console.error("Error:", err);
                alert("Terjadi kesalahan saat merubah produk");
            }
        }
    };
    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    };

    return (
        <div className="container mt-4">
            <h2>Edit produk</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <input
                        type="text"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan deskripsi produk"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan harga produk"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">-- pilih kategori --</option>
                        {kategori.map((item) => (
                            <option key={item.id_kategori} value={item.id_kategori}>
                                {item.kategori}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success me-2">
                    Simpan perubahan
                </button>
            </form>
        </div>
    )
}
