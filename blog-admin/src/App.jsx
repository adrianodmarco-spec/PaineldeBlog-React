import { useState } from 'react'

function App() {
  const [posts, setPosts] = useState([])

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [editingId, setEditingId] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert('Preencha todos os campos.')
      return
    }

    if (editingId) {
      const updatedPosts = posts.map((post) =>
        post.id === editingId
          ? {
              ...post,
              title,
              content
            }
          : post
      )

      setPosts(updatedPosts)

      setEditingId(null)
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content
      }

      setPosts([newPost, ...posts])
    }

    clearForm()
  }

  function handleEdit(post) {
    setTitle(post.title)
    setContent(post.content)
    setEditingId(post.id)
  }

  function handleDelete(id) {
    const filteredPosts = posts.filter(
      (post) => post.id !== id
    )

    setPosts(filteredPosts)
  }

  function clearForm() {
    setTitle('')
    setContent('')
  }

  function cancelEdit() {
    clearForm()
    setEditingId(null)
  }

  return (
    <div className="container">
      <h1>Painel Administrativo do Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">
          {editingId
            ? 'Salvar Alterações'
            : 'Publicar'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="posts">
        {posts.length === 0 ? (
          <p>Nenhuma postagem encontrada.</p>
        ) : (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>

              <p>{post.content}</p>

              <div className="buttons">
                <button
                  onClick={() => handleEdit(post)}
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(post.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App