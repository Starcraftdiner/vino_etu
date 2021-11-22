import React from 'react';

import { Box } from '@mui/system';
import { Fab, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import './AjoutCellier.css';

/** 
 * Component de l'ajout d'un cellier
 * 
*/
export default class AjoutCellier extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			emplacement: '',
			temperature: null,
			usager_id: 0,
			titreBoutton: '',
			erreurEmplacement: false
		};

		this.validation = this.validation.bind(this);
		this.saisirEmplacement = this.saisirEmplacement.bind(this);
		this.saisirTemperature = this.saisirTemperature.bind(this);
		this.creerCellier = this.creerCellier.bind(this);
	}

	/** 
	 * Redirection à la page de connexion si l'usager n'est pas connecté
	 * 
	 */
	componentDidMount() {
		if (!this.props.estConnecte) {
			return this.props.history.push('/connexion');
		}
		this.setState({ titreBoutton: 'Nouveau cellier' });
	}

	componentDidUpdate() {
		if (!this.props.estConnecte) {
			return this.props.history.push('/connexion');
		}
	}
	/** 
	 * Fonction de validation des inputs
	 * 
	 */
	validation() {
		let estValide = false;

		this.setState({
			erreurEmplacement: true
		});

		if (this.state.emplacement && this.state.emplacement.trim() !== '') {
			estValide = true;
			this.setState({ erreurEmplacement: false });
		}
		return estValide;
	}

	saisirEmplacement(e) {
		this.setState({ emplacement: e.target.value });
	}

	saisirTemperature(e) {
		this.setState({ temperature: e.target.value });
	}

	/** 
	 * Fonction de la création d'un cellier
	 * 
	 */
	creerCellier() {
		if (this.validation()) {
			let donnees = {
				emplacement: this.state.emplacement,
				usager_id: this.props.id_usager,
				temperature: this.state.temperature
			};

			const postMethod = {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					authorization: 'Basic ' + btoa('vino:vino')
				},
				body: JSON.stringify(donnees)
			};

			fetch('https://rmpdwebservices.ca/webservice/php/celliers/', postMethod)
				.then((reponse) => reponse.json())
				.then((donnees) => {
					if (donnees.data) return this.props.history.push('/celliers/liste');
				});
		} else {
			console.log('Validation incorrecte!!!');
		}
	}

	render() {
		const messageErreurEmplacement = (
			<span className="message_erreur">{this.state.erreurEmplacement ? '* Ce champ est obligatoire.' : ''}</span>
		);
		return (
			<Box>
				<Breadcrumbs aria-label="breadcrumb" sx={{ display: 'flex', margin: '0 1.8rem' }}>
					<Typography color="text.primary">Mon Cellier</Typography>
					<Typography color="text.primary">Nouveau cellier</Typography>
				</Breadcrumbs>

				<Box
					className="nouvelle_cellier_container"
					sx={{
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						display: 'flex',
						justfyContent: 'center',
						alignItems: 'center',
						gap: '1rem',
						width: '85vw',
						flexDirection: 'column',
						borderRadius: '1rem',
						margin: '0 auto',
						marginTop: '15vh'
					}}
				>
					<span className="nouvelle_cellier_title"> {this.state.titreBoutton} </span>

					<TextField
						autoFocus
						error={this.state.erreurEmplacement}
						label="Emplacement"
						variant="outlined"
						onBlur={(e) => this.saisirEmplacement(e)}
						sx={{
							color: 'white',
							'& label.Mui-focused': {
								color: 'white'
							},
							'& input:valid + fieldset': {
								borderColor: 'white'
							},
							'& input:invalid + fieldset': {
								borderColor: 'red'
							},
							'& input:invalid:focus + fieldset': {
								borderColor: 'white',
								padding: '4px !important'
							},
							'& input:valid:focus + fieldset': {
								borderColor: 'white'
							}
						}}
					/>
					{messageErreurEmplacement}
					<TextField
						margin="dense"
						id="temperature"
						label="Température"
						type="number"
						variant="outlined"
						inputProps={{ step: '0.5' }}
						onBlur={(e) => this.saisirTemperature(e)}
						sx={{
							color: 'white',
							'& label.Mui-focused': {
								color: 'white'
							},
							'& input:valid:focus + fieldset': {
								borderColor: 'white'
							}
						}}
					/>

					<Fab
						variant="extended"
						onClick={() => this.creerCellier()}
						sx={{ backgroundColor: '#641b30', color: 'white' }}
					>
						<AddOutlinedIcon sx={{ marginRight: '1rem' }} />
						Nouveau cellier
					</Fab>
				</Box>
			</Box>
		);
	}
}
