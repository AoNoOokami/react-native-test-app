import { Button, Container, Content, Form, Input, Item, Spinner } from "native-base";
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { getFilmsFromApiWithSearchedText } from "../api/TMBDapi";
import FilmListItem from "../components/search/FilmListItem";

export function Search(props) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let searchText = '';

    const _loadMovies = () => {
        if (searchText.length > 0) {
            console.log(searchText);
            setIsLoading(true);
            getFilmsFromApiWithSearchedText(searchText).then(data => {
                setMovies(data.results);
                setIsLoading(false);
            });
        }
    }

    const _updateSearchText = (text) => {
        searchText = text;
    }

    const _displayDetailForFilm = (id) => {
        console.log("Display film with id " + id);
        props.navigation.navigate('Detail', {id: id});
    }

    if (isLoading) {
        return <Spinner color='gray' />
    }

    else {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Item>
                            <Input
                                placeholder='Titre du film'
                                onChangeText={(text) => _updateSearchText(text)}
                                onSubmitEditing={_loadMovies}/>
                        </Item>
                    </Form>
                    <Button block light style={styles.button} onPress={_loadMovies}>
                        <Text>Search</Text>
                    </Button>
                        <FlatList
                            data={movies}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => <FilmListItem movie={item} displayDetailForFilm={_displayDetailForFilm}/>}
                        />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      marginVertical: 16
    }
  })