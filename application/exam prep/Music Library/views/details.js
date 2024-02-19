import { deleteAlbum, getAlbumsById, getTotalLikeAlbum, getTotalLikeAlbumFromUser, likeAlbum } from '../data/services.js';
import { html } from '../node_modules/lit-html/lit-html.js';
 import { getUserData } from '../util.js';

const detailsTemplate = (album, isOwner, onDelete, showLikeButton, onLike, like) => html `
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src=${album.imageUrl} />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">${like}</span></div>
  ${albumControlsTemplate(album, isOwner, onDelete)}
  ${likeControlsTemplate(showLikeButton , onLike )}
  </div>
  </section>`

const albumControlsTemplate = (album, isOwner, onDelete) => {
    if (isOwner){
         return html`
         <div id="action-buttons">
         <a href="/edit/${album._id}" id="edit-btn">Edit</a>
         <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
       </div>`
    } else { 
        return null
     }
};

const likeControlsTemplate = (showLikeButton, onLike, like) => {
    if(showLikeButton) {
        return html `
        <div id="action-buttons">
        <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
        </div>`
    } else {
         return null
         }
};


export async function detailsPage(ctx){
    
    const albumId = ctx.params.id;
    const album = await getAlbumsById(albumId);

    const userId = getUserData()?._id;
    const isOwner = album._ownerId === userId;
    

    const like = await getTotalLikeAlbum(albumId);
    const myLike = await getTotalLikeAlbumFromUser(albumId, userId);
    const showLikeButton = (!isOwner && !myLike && userId);
    

     ctx.render(detailsTemplate(album, isOwner, onDelete, showLikeButton, onLike, like));

     async function onDelete(){
         const confirmed = confirm(`Are you sure you want to delete ${album.album}?`);
        if(confirmed) {
           await deleteAlbum(albumId);
            ctx.page.redirect('/');
     }
 }

    async function onLike(){
            await likeAlbum(albumId);
            ctx.page.redirect(`/details/${albumId}`);
    }

}