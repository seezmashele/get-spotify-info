import { useState } from "react"
// import { Link } from "react-router-dom"
// import { pageButtons } from "../shared/pageButtons"
import { generateRandomString, generateCodeChallenge } from "../js/misc"

function Home() {
  const [playlistURL, setPlaylistURL] = useState("")
  const [spotifyToken, setSpotifyToken] = useState("")
  const clientId = "fc825efe3f8c4a58b1ec570853cb95a1"
  const redirectUri = "https://get-spotify-info.web.app/callback"
  // const redirectUri = "http://localhost:5020/callback"

  const getToken = async () => {
    const codeVerifier = generateRandomString(50)
    // const result = await generateCodeChallenge(codeVerifier)
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16)
      let scope = "user-read-private user-read-email"

      localStorage.setItem("code_verifier", codeVerifier)

      let args = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge
      })

      window.location = "https://accounts.spotify.com/authorize?" + args
    })
  }

  // if (localStorage.getItem("access_token")) {
  //   getToken()
  // } else {
  //   getToken()
  // }

  const getSpotifyInfo = async () => {
    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
    const token =
      "BQBbG2Csoiq9C3_ATkFOFJNbFOO9JYIbSNneQBkTmay1MgtO_23XAeIcjGJmNUfVS4OQA0RGvSRODXzgN27SV3e202vyi-phyo7CM_brosa2isx39YAn2MPOyt_tQ0tMpZXojXLMhYAc0vHLnRj7QQZRcgpZTeuQQL9QmOwPbvR4U4IRPYJVSNG40NEIXJcUqU6Htd8o8oNm_cAejZBOJhrwbNIjdqhdj_1eoOpocGnG_Kj5DI96kCY4vhLJd1h1VaVi-zoGB6EaFB4cRSphlpcYbw"
    async function fetchWebApi(endpoint, method, body) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method,
        body: JSON.stringify(body)
      })
      return await res.json()
    }

    async function getTopTracks() {
      // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
      return (
        await fetchWebApi(
          "v1/me/top/tracks?time_range=short_term&limit=5",
          "GET"
        )
      ).items
    }

    const topTracks = await getTopTracks()
    console.log(
      topTracks?.map(
        ({ name, artists }) =>
          `${name} by ${artists.map(artist => artist.name).join(", ")}`
      )
    )
  }

  const pasteLink = () => {}

  const downloadImage = () => {
    console.log("download image")
  }

  return (
    <div className=" w-full flex flex-col max-w-3xl px-8 mx-auto left-0 right-0 pb-20 select-none">
      {/* <div className="h-16 border-bF border-neutral-500 flex items-center justify-center space-x-2">
        {pageButtons.map((item, index) => {
          return (
            <Link to={item.path} key={"tab" + index}>
              <div
                className={`min-w-[8rem] select-none border-2 py-2 px-3 whitespace-nowrap hover:bg-neutral-200 bg-neutral-100 font-semiboldf rounded cursor-pointer text-center ${
                  index === selectedPageIndex
                    ? "border-blue-400"
                    : "border-transparent"
                }`}
              >
                {item.title}
              </div>
            </Link>
          )
        })}
      </div> */}
      <div className="w-full mt-6 flex">
        <div className="mr-5">
          <h3 className="font-semibold text-2xl text-centerF">
            Get details for an album or playlist
          </h3>
          <p className="mt-4 text-centerF">Type the website address below</p>
        </div>
        <div className="flex-grow"></div>
        <div className="">
          <button className="border border-black rounded p-3 hover:bg-neutral-50">
            Sign in to Spotify
          </button>
        </div>
      </div>

      <div className="w-full mt-12 bg-neutral-300F flex justify-center items-center space-x-3">
        <input
          required
          placeholder="Album / playlist address"
          type="text"
          value={playlistURL}
          onChange={e => setPlaylistURL(e.target.value)}
          className="border flex-grow file:border-2 rounded p-4 border-neutral-400"
        />
        <button
          onClick={pasteLink}
          className="border border-neutral-200 bg-neutral-50 rounded p-2 px-3 hover:bg-neutral-100"
        >
          Paste link
        </button>
        <button
          onClick={getSpotifyInfo}
          className="bg-green-600 text-white rounded p-2 px-3 hover:bg-green-700"
        >
          Get info
        </button>
      </div>

      {/* <div className="rounded bg-red-50 p-3 text-red-500 text-center mt-9">
        Sign in to get details
      </div> */}

      <div className="w-full mt-12 flex justify-center">
        <div
          className="borderF roundedF w-full min-h-[20rem] border-black
        "
        >
          <div className="w-full pb-6 flex space-x-3 items-center border-black border-b">
            <div className="font-semibold text-xl flex-grow select-text">
              Album: DJ Bongz – Syalo
            </div>
            <div className=""></div>
            <button
              onClick={downloadImage}
              className="bg-neutral-50 whitespace-nowrap text-blue-600F border-neutral-200 border rounded p-2 px-3 hover:bg-neutral-100"
            >
              Copy title
            </button>
            <button
              onClick={downloadImage}
              className="bg-neutral-50 whitespace-nowrap rounded p-2 px-3 hover:bg-neutral-100 border border-neutral-200"
            >
              Copy tracklist
            </button>
          </div>

          <div className="select-text py-6">
            <ol start="1" className="list-decimal">
              <li>Soulmove Nomathemba (feat. Sisanda & Kgosi)</li>
              <li>Lele </li>
              <li>DJ Bongz & DJ Gukwa – Smokolo Mapakisha (feat. Zaba)</li>
              <li>Kumnandi Ukujaiva (feat. Zaba)</li>
              <li>Angsakhoni (feat. Scammer & Mr AVM)</li>
              <li>Keep It Cool (feat. Zaba)</li>
              <li>Shaya (feat. Bongo & Rara)</li>
              <li>Agogo</li>
            </ol>
          </div>
          <div className="flex py-6 justify-center items-center select-text border-t border-black space-x-5">
            <div className="">
              <span>Release date: </span>
              <span>20 September 2022</span>
            </div>
            {/* <div className="select-none"> | </div>
            <div className="">
              <span>5 songs.</span>
            </div> */}
            <div className="flex-grow"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
