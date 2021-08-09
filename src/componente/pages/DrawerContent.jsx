import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Caption, Drawer, Paragraph, Switch, Text, Title, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../pages/UserContext';

export function DrawerContent(props) {
	const { logout } = useContext(UserContext);

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={{ flexDirection: 'row', marginTop: 15 }}>
							<Avatar.Image
								source={{
									uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
								}}
								size={50}
							/>
							<View style={{ marginLeft: 15, flexDirection: 'column' }}>
								<Title style={styles.title}>Seja Bem vindo!</Title>
								<Caption style={styles.caption}>@j_doe</Caption>
							</View>
						</View>
					</View>

					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
							label="Home"
							onPress={() => {
								props.navigation.navigate('Home');
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => <Icon name="bookmark-outline" color={color} size={size} />}
							label="Histórico"
							onPress={() => {
								props.navigation.navigate('Historico');
							}}
							/>
						<DrawerItem
							icon={({ color, size }) => <Icon name="account-outline" color={color} size={size} />}
							label="Perfil"
							onPress={() => {
								props.navigation.navigate('Perfil');
							}}
						/>
						{/* <DrawerItem
							icon={({ color, size }) => <Icon name="settings-outline" color={color} size={size} />}
							label="Cadastro de Motoristas"
							onPress={() => {
								props.navigation.navigate('Cadastro de Motoristas');
							}}
						/> */}
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({ color, size }) => <Icon name="exit-to-app" color={color} size={size} />}
					label="Sign Out"
					onPress={() => {
						logout();
					}}
				/>
			</Drawer.Section>
		</View>
	);
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1
	},
	userInfoSection: {
		paddingLeft: 20
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: 'bold'
	},
	caption: {
		fontSize: 14,
		lineHeight: 14
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3
	},
	drawerSection: {
		marginTop: 15
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16
	}
});
