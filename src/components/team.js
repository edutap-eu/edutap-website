import * as React from "react";
import {StaticImage} from "gatsby-plugin-image";

// TODO: rework team
// TODO: add name and position
// TODO: load from list
const Team = () => (
    <div className={'grid grid-cols-3 gap-16'}>
        <div className={'flex flex-col space-y-2 items-center'}>
            <div className="avatar">
                <div className="w-28 mask mask-squircle">
                    <StaticImage src="../images/team/mock.png" alt={''} height={120}
                                 style={{height: '120px'}}/>
                </div>
            </div>
            <span className={'font-bold'}>Alexander Loechel • LMU Munich</span>
        </div>
        <div className={'flex flex-col space-y-2 items-center'}>
            <div className="avatar">
                <div className="w-28 mask mask-squircle">
                    <StaticImage src="../images/team/mock.png" alt={''} height={120}
                                 style={{height: '120px'}}/>
                </div>
            </div>
            <span className={'font-bold'}>Jose Filipe Alves • U.Porto</span>

        </div>
        <div className={'flex flex-col space-y-2 items-center'}>
            <div className="avatar">
                <div className="w-28 mask mask-squircle">
                    <StaticImage src="../images/team/mock.png" alt={''} height={120}
                                 style={{height: '120px'}}/>
                </div>
            </div>
            <span className={'font-bold'}>Morgan Persson • Lunds universitet</span>
        </div>

        <div className={'flex flex-col space-y-2 items-center'}>
            <div className="avatar">
                <div className="w-28 mask mask-squircle">
                    <StaticImage src="../images/team/mock.png" alt={''} height={120}
                                 style={{height: '120px'}}/>
                </div>
            </div>
            <span className={'font-bold'}>Christine Baumgartner • PM</span>
        </div>

        <div className={'flex flex-col space-y-2 items-center'}>
            <div className="avatar">
                <div className="w-28 mask mask-squircle">
                    <StaticImage src="../images/team/mock.png" alt={''} height={120}
                                 style={{height: '120px'}}/>
                </div>
            </div>
            <span className={'font-bold'}>Jens Klein • Dev</span>
        </div>

        <div className={'flex flex-col space-y-2 items-center'}>
            <div className="avatar">
                <div className="w-28 mask mask-squircle">
                    <StaticImage src="../images/team/mock.png" alt={''} height={120}
                                 style={{height: '120px'}}/>
                </div>
            </div>
            <span className={'font-bold'}>Philip Auersperg • Dev</span>
        </div>
    </div>
)

export default Team;
