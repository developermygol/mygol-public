import React, { Component, Fragment } from 'react';
import CrudForm from '../../../../common/FormsMobx/CrudForm';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import { getUploadsImg } from '../../../../helpers/Utils';
import PlayerDetails from '../../../Players/Details';
import Loc from '../../../../common/Locale/Loc';
import PlayerInviteDialog from '../../../Players/Invite/PlayerInviteDialog';
import { observable } from 'mobx';

@inject('store')
@observer
class TeamPlayers extends Component {

    @observable showInviteDialog = false;

    getPlayerAvatar = (player) => {
        return this.getPlayerLink(player,
            getUploadsImg(player.userData.avatarImgUrl, player.id, 'user', 'PlayerAvatar Mini')
        );
    }

    getPlayerLink = (player, content) => {
        return (
            <Link to={this.props.match.url + '/' + player.id}>{content}</Link>
        )
    }

    handleInvitePlayer = () => {
        this.showInviteDialog = true;
    }

    handlePlayerInvited = (data) => {
        this.showInviteDialog = false;        
        if (!data) return;

        const p = this.props;
        const { idTeam, idTournament } = p.match.params;

        this.props.store.players.invitePlayer(
            data.selectedItem.id,
            idTeam, 
            idTournament,
            data.inviteText
        ).then(res => {
            this.props.store.players.actions.getAll('/players/forteam/' + idTeam);
        })
    }

    handleCreate = (data) => {
        const { params } = this.props.match;

        data.teamData = {
            idTeam: params.idTeam,
            idTournament: params.idTournament
        };

        this.props.store.players.create(data);  // Not actions.create
    }

    hideAllBut = (fields, visibleFields) => {
        fields.forEach(f => {
            if (visibleFields.indexOf(f.fieldName) === -1)  // Not in list of visibles, hide.
                f.hideInEdit = true;
        })
    }

    showAllBut = (fields, hideFields) => {
        fields.forEach(f => {
            if (hideFields.indexOf(f.fieldName) > -1)  // In list of fields to hide.
                f.hideInEdit = true;
        })
    }

    getFields = () => {

        const fields = [
            { fieldName: 'userData.avatarImgUrl', localizedLabel: 'AvatarImg', listRenderHandler: this.getPlayerAvatar },
            { fieldName: 'name', localizedLabel: 'Name', listRenderHandler: (r) => this.getPlayerLink(r, r.name) },
            { fieldName: 'surname', localizedLabel: 'Surname', listRenderHandler: (r) => this.getPlayerLink(r, r.surname) },

            { fieldName: 'teamData.apparelNumber', localizedLabel: 'ApparelNumber', listRenderHandler: r => <span className='ApparelNumber'>{r.teamData.apparelNumber}</span> },
            { fieldName: 'teamData.fieldPosition', localizedLabel: 'FieldPosition'},
            { fieldName: 'teamData.fieldSide', localizedLabel: 'FieldSide' }
        ];

        return fields;
    }


    render() {
        const players = this.props.store.players;
        const listData = players.all ? players.all.slice() : null;
        const { idTeam, idTournament } = this.props.match.params;

        return (
            <Fragment>
                <CrudForm
                    title='Players'
                    addMessage='Add new player'
                    editMessage='Edit player'

                    detailsComponent={PlayerDetails}

                    getAllAction={() => players.actions.getAll('/players/forteam/' + idTeam)}
                    editAction={(data) => players.actions.edit(data)}
                    addAction={(data) => this.handleCreate(data)}
                    deleteAction={(data) => players.unlinkTeam(data, idTournament)}

                    deleteDialogTitle='Unlink player?'
                    deleteDialogMessage='Confirm player unlink'

                    listData={listData}
                    loadingStatus={players.loading}

                    routeIdParamName='idPlayer'

                    listBackButton={false}
                    listAdditionalButtons={
                        <button className='Button' onClick={this.handleInvitePlayer}><Loc>Invite player</Loc></button>
                    }

                    addData={{
                        name: null,
                        surname: null,
                        userData: {
                            email: null,
                            mobile: null,
                        }
                    }}


                    fieldDefinition={this.getFields()}
                />

                <PlayerInviteDialog
                    show={this.showInviteDialog}
                    onCancel={() => this.showInviteDialog = false}
                    onFinish={this.handlePlayerInvited}
                />

            </Fragment>
        )
    }
}

export default withRouter(TeamPlayers);