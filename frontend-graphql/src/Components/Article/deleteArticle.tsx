import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($articleId: ID!) {
    deleteArticle(articleId: $articleId) {
      success
      message
    }
  }
`;

interface DeleteArticleButtonProps {
  articleId: string;
  refetch?: () => void;
}

export const DeleteArticleButton: React.FC<DeleteArticleButtonProps> = ({ articleId, refetch }) => {
  const { getUserInfos } = useContext(UserContext);
  const user = getUserInfos();

  const [deleteArticle, { loading }] = useMutation(DELETE_ARTICLE, {
    context: {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    },
  });

  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      const { data } = await deleteArticle({ variables: { articleId: articleId } });

      if (data?.deleteArticle?.success) {
        alert("Article supprimé avec succès !");
        if (refetch) refetch();
      } else {
        alert(data?.deleteArticle?.message || "Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression :", err.message);
      alert("Erreur lors de la suppression. Veuillez réessayer.");
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete} disabled={loading}>
      {loading ? "Suppression..." : "Supprimer"}
    </Button>
  );
};

export default DeleteArticleButton;
