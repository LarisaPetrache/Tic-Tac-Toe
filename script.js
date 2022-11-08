const Gameboard = (() => {
    let board = []
    let turn = 1
    let free_squares = 9
    let winner = false
    let cell_array = document.querySelectorAll(".cell")
    let reset = document.querySelector("#resetBtn")

    const setup = () => {
        cell_array.forEach(element => {
            board.push(element)
        });

        reset.addEventListener("click", resetGame)
    }

    const play = () => {

        board.forEach(element => {
            element.addEventListener("click", () => {
                if(free_squares != 0 && !winner)
                {
                    if(element.innerText == "")
                        if(turn == 1)
                        {
                            element.innerText = "X"
                            turn = 2
                            free_squares -= 1
                            document.querySelector("#score").innerText = "Turn: Player O"
                        }
                        else
                        {
                            element.innerText = "O"
                            turn = 1
                            free_squares -=1
                            document.querySelector("#score").innerText = "Turn: Player X"
                        }

                    // verticala
                    for(i=0; i<3 && !winner; i++)
                    {
                        let value = board[i].innerText
                        if(board[i+3].innerText == value && board[i+6].innerText == value && value!="")
                        {
                            document.querySelector("#score").innerText = `Player ${value} won!`
                            winner = true
                        }
                    }

                    // orizontala
                    for(i=0; i<=6 && !winner; i+=3)
                    {
                        let value = board[i].innerText
                        if(board[i+1].innerText == value && board[i+2].innerText == value && value!="")
                        {
                            document.querySelector("#score").innerText = `Player ${value} won!`
                            winner = true
                        }
                    }

                    // diagonala principala
                    if(board[0].innerText == board[4].innerText && board[4].innerText == board[8].innerText && board[0].innerText != "")
                    {
                        document.querySelector("#score").innerText = `Player ${board[0].innerText} won!`
                        winner = true
                    }

                    // diagonala secundara
                    if(board[2].innerText == board[4].innerText && board[4].innerText == board[6].innerText && board[2].innerText != "")
                    {
                        document.querySelector("#score").innerText = `Player ${board[2].innerText} won!`
                        winner = true
                    }
                }
                else if(free_squares == 0 && !winner)
                {
                    document.querySelector("#score").innerText = `Draw!`
                    winner = true
                }
            })
        });

    }

    const resetGame = () => {
        
        board.forEach(element => {
            element.innerText = ""
        })

        turn = 1
        free_squares = 9
        winner = false
        document.querySelector("#score").innerText = `Turn: Player X`
        play()
    }

    return { board, setup, play }

})();

const Players = (score) => {

    const refreshScore = () => {
        
    }

    return { score, refreshScore}
}

Gameboard.setup()
Gameboard.play()