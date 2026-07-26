type AboutNotesEssayProps = {
    youtubeUrl?: string;
};

export default function AboutNotesEssay({ youtubeUrl }: AboutNotesEssayProps) {
    const resolvedYoutubeUrl = youtubeUrl ?? process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "";

    return (
        <div className="about-notes__essay">
            <h3>Meine Leidenschaft wiederentdeckt</h3>
            <p className="about-notes__lead">
                Nach mehr als einem Jahrzehnt habe ich die Malerei wiedergefunden und meinen Weg zur abstrakten Kunst
                entdeckt. Mich reizt vor allem die Freiheit: Ich muss keinem Stil folgen und kann ausdrücken, was ich
                gerade fühle.
            </p>
            <h4>Eine kreative Balance</h4>
            <p>
                Abstrakte Kunst ist für mich der perfekte Ausgleich zu meinem Beruf als Softwareentwickler. Während es
                im Job klare Rahmen gibt, kann ich auf der Leinwand ohne Regeln arbeiten – und wenn etwas nicht passt,
                entsteht daraus einfach etwas Neues.
            </p>
            <h4>Die Freiheit zu experimentieren</h4>
            <p>
                Meine Bilder ähneln sich selten, weil jedes Werk aus dem Moment heraus entsteht. Ich liebe es, neue
                Techniken und Ideen auszuprobieren – deshalb ist jedes Bild ein Unikat.
            </p>
            <p className="about-notes__muted">
                Originale findest du im Shop. Aufträge sind nach Absprache möglich.
                <br />
                {resolvedYoutubeUrl ? (
                    <>
                        Wenn du den Entstehungsprozess sehen möchtest, findest du kurze Videos dazu auf{" "}
                        <a href={resolvedYoutubeUrl} target="_blank" rel="noreferrer">meinem YouTube-Kanal</a>.
                        Danke, dass du dir Zeit nimmst, meine Kunst zu entdecken – ich hoffe, sie inspiriert dich.
                    </>
                ) : (
                    <>
                        Wenn du den Entstehungsprozess sehen möchtest, findest du kurze Videos dazu auf meinem YouTube-Kanal.
                        Danke, dass du dir Zeit nimmst, meine Kunst zu entdecken – ich hoffe, sie inspiriert dich.
                    </>
                )}
            </p>
        </div>
    );
}
