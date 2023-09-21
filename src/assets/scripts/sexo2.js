document.addEventListener('submit', () => {
    let name = document.querySelector('#movieName').value
    let sinopse = document.querySelector('#movieSinopse').value
    let genre = document.querySelector('#movieGenre').value
    let type = document.querySelector('#movieType').value
    let duration = document.querySelector('#movieDuration').value
    let fullCover = document.querySelector('#movieFullCover').value
    let cover = document.querySelector('#movieCover').value

    addData(name, sinopse, duration, type, genre, fullCover, cover)
})

async function addData(name, sinopse, duration, type, genre, fullCover, cover) {
    import * from "../scripts/database/schemas/movie.js"
z    try {
        await Movie.create({
            mID: Movie.collection.findOne().sort({ age: -1 }) ? 0 : Movie.collection.findOne().sort({ age: -1 }),
            mName: name,
            mSinopse: sinopse,
            mDuration: duration,
            mType: type,
            mGenres: genre,
            mFullSizeCover: fullCover,
            mCover: cover,
        })
    } catch (err) { console.log(err) }
}

